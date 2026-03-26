import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, RefreshCw, CheckCircle } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, accentColor, delay }) => (
    <div className="col-12 col-md-6 col-lg-3">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="card border-0 rounded-lg p-4 h-100"
            style={{
                backgroundColor: 'var(--bg-surface)',
                boxShadow: 'var(--shadow-sm)',
                borderTop: `4px solid ${accentColor}`,
                transition: 'var(--transition-normal)',
                cursor: 'pointer'
            }}
            whileHover={{
                y: -4,
                boxShadow: 'var(--shadow-lg)'
            }}
        >
            <div className="d-flex align-items-center justify-content-between h-100">
                <div>
                    <p className="small fw-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                        {title}
                    </p>
                    <p className="fs-2 fw-bold m-0" style={{ color: 'var(--text-primary)' }}>
                        {value}
                    </p>
                </div>
                <div 
                    className="rounded-circle d-flex align-items-center justify-content-center text-white"
                    style={{
                        width: '56px',
                        height: '56px',
                        padding: '12px',
                        backgroundColor: accentColor,
                        flexShrink: 0
                    }}
                >
                    <Icon size={24} />
                </div>
            </div>
        </motion.div>
    </div>
);

export default function StatsSection({ stats }) {
    if (!stats) return null;

    const data = [
        { 
            title: 'Total Complaints', 
            value: stats.total, 
            icon: FileText, 
            accentColor: 'var(--primary-main)' 
        },
        { 
            title: 'Pending', 
            value: stats.pending, 
            icon: Clock, 
            accentColor: 'var(--status-warning)' 
        },
        { 
            title: 'In Progress', 
            value: stats.inProgress, 
            icon: RefreshCw, 
            accentColor: 'var(--accent-main)' 
        },
        { 
            title: 'Resolved', 
            value: stats.resolved, 
            icon: CheckCircle, 
            accentColor: 'var(--secondary-main)' 
        },
    ];

    return (
        <div className="row g-4 mb-4">
            {data.map((item, index) => (
                <StatCard key={index} {...item} delay={0.1 * (index + 1)} />
            ))}
        </div>
    );
}
