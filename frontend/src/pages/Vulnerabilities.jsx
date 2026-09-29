import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Chip,
    CircularProgress
} from '@mui/material';
import { FiCheckCircle } from 'react-icons/fi';
import { getVulnerabilities } from '../services/api.js';
import { SEVERITY_COLORS } from '../theme/socTheme.js';

export default function Vulnerabilities() {
    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const loadVulnerabilities = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getVulnerabilities();

                // Supports multiple possible API response shapes:
                // 1. [...]
                // 2. { vulnerabilities: [...] }
                // 3. { data: [...] }
                // 4. { data: { vulnerabilities: [...] } }
                const vulnerabilityList = Array.isArray(response)
                    ? response
                    : Array.isArray(response?.vulnerabilities)
                        ? response.vulnerabilities
                        : Array.isArray(response?.data)
                            ? response.data
                            : Array.isArray(response?.data?.vulnerabilities)
                                ? response.data.vulnerabilities
                                : [];

                if (isMounted) {
                    setVulnerabilities(vulnerabilityList);
                }
            } catch (err) {
                console.error('Failed to load vulnerabilities:', err);

                if (isMounted) {
                    setVulnerabilities([]);
                    setError(err?.message || 'Failed to load vulnerabilities');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadVulnerabilities();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    p: 4,
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <CircularProgress sx={{ color: '#22D3EE' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography sx={{ color: '#F87171' }}>
                    Failed to load vulnerabilities: {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography
                variant="h4"
                sx={{
                    fontFamily: '"Sora", sans-serif',
                    fontWeight: 800,
                    color: '#F8FAFC',
                    mb: 3
                }}
            >
                Vulnerabilities
            </Typography>

            {vulnerabilities.length === 0 ? (
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        backgroundColor: 'rgba(18, 17, 31, 0.75)',
                        border: '1px solid rgba(34, 211, 238, 0.15)',
                        borderRadius: '14px',
                        textAlign: 'center'
                    }}
                >
                    <Typography sx={{ color: '#94A3B8' }}>
                        No vulnerabilities found.
                    </Typography>
                </Paper>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5
                    }}
                >
                    {vulnerabilities.map((vuln, index) => {
                        const vulnerability = vuln || {};

                        const vulnerabilityId =
                            vulnerability.id ||
                            vulnerability.vulnerability_id ||
                            vulnerability.cve_id ||
                            `vulnerability-${index}`;

                        const displayTitle =
                            vulnerability.title ||
                            vulnerability.name ||
                            vulnerability.description ||
                            vulnerability.cve_id ||
                            'Unknown Vulnerability';

                        const displayCvss =
                            vulnerability.cvss_score ??
                            vulnerability.cvss ??
                            vulnerability.cvssScore ??
                            'N/A';

                        const displayAsset =
                            vulnerability.asset ||
                            vulnerability.asset_id ||
                            vulnerability.assetId ||
                            'N/A';

                        const severity = String(
                            vulnerability.severity ||
                            vulnerability.risk_level ||
                            'Low'
                        );

                        const status = String(
                            vulnerability.status ||
                            vulnerability.state ||
                            'Open'
                        );

                        const severityKey =
                            Object.keys(SEVERITY_COLORS).find(
                                (key) => key.toLowerCase() === severity.toLowerCase()
                            ) || 'Low';

                        const severityStyle =
                            SEVERITY_COLORS[severityKey] || SEVERITY_COLORS.Low;

                        const normalizedStatus = status.toLowerCase();

                        const patchAvailable =
                            normalizedStatus === 'patched' ||
                            normalizedStatus === 'resolved' ||
                            normalizedStatus === 'fixed';

                        const resolved =
                            normalizedStatus === 'resolved' ||
                            normalizedStatus === 'patched' ||
                            normalizedStatus === 'fixed';

                        return (
                            <Paper
                                key={vulnerabilityId}
                                elevation={0}
                                sx={{
                                    p: 2.5,
                                    backgroundColor: 'rgba(18, 17, 31, 0.75)',
                                    backdropFilter: 'blur(16px)',
                                    border: '1px solid rgba(34, 211, 238, 0.15)',
                                    borderRadius: '14px',
                                    borderLeft: `4px solid ${severityStyle.main}`
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        gap: 2,
                                        flexWrap: 'wrap'
                                    }}
                                >
                                    <Box sx={{ flex: 1, minWidth: 240 }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1.5,
                                                mb: 0.5,
                                                flexWrap: 'wrap'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: '#22D3EE',
                                                    fontFamily: 'monospace',
                                                    fontWeight: 700,
                                                    fontSize: '0.85rem'
                                                }}
                                            >
                                                {vulnerability.cve_id ||
                                                    vulnerability.vulnerability_id ||
                                                    vulnerability.id ||
                                                    'N/A'}
                                            </Typography>

                                            <Chip
                                                label={severity}
                                                size="small"
                                                sx={{
                                                    backgroundColor: severityStyle.bg,
                                                    color: severityStyle.main,
                                                    border: `1px solid ${severityStyle.border}`,
                                                    fontWeight: 800,
                                                    fontSize: '0.7rem',
                                                    height: 22
                                                }}
                                            />

                                            <Typography
                                                sx={{
                                                    color: '#94A3B8',
                                                    fontSize: '0.75rem'
                                                }}
                                            >
                                                CVSS {displayCvss}
                                            </Typography>
                                        </Box>

                                        <Typography
                                            sx={{
                                                color: '#F8FAFC',
                                                fontWeight: 600,
                                                fontSize: '0.92rem',
                                                mb: 0.5
                                            }}
                                        >
                                            {displayTitle}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: '#64748B',
                                                fontSize: '0.8rem'
                                            }}
                                        >
                                            Asset: {displayAsset}
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: {
                                                xs: 'flex-start',
                                                sm: 'flex-end'
                                            },
                                            gap: 1
                                        }}
                                    >
                                        <Chip
                                            label={status}
                                            size="small"
                                            sx={{
                                                backgroundColor: resolved
                                                    ? 'rgba(16, 185, 129, 0.15)'
                                                    : 'rgba(148, 163, 184, 0.15)',
                                                color: resolved ? '#10B981' : '#94A3B8',
                                                fontWeight: 700,
                                                fontSize: '0.72rem'
                                            }}
                                        />

                                        {patchAvailable && (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5
                                                }}
                                            >
                                                <FiCheckCircle size={13} color="#10B981" />

                                                <Typography
                                                    sx={{
                                                        color: '#10B981',
                                                        fontSize: '0.72rem',
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    Patch Available
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            </Paper>
                        );
                    })}
                </Box>
            )}
        </Box>
    );
}