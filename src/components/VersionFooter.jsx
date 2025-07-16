import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiGithub, FiInfo } = FiIcons;

function VersionFooter() {
  const version = "1.0.0";
  const year = new Date().getFullYear();

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 p-2 bg-black/20 backdrop-blur-sm text-white/60 text-xs text-center"
    >
      <div className="flex items-center justify-center gap-2">
        <SafeIcon icon={FiInfo} className="text-xs" />
        <span>v{version}</span>
        <span>•</span>
        <span>© {year} Memory Game</span>
        <span>•</span>
        <a 
          href="https://github.com/webcontainer"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors flex items-center gap-1"
        >
          <SafeIcon icon={FiGithub} className="text-xs" />
          GitHub
        </a>
      </div>
    </motion.footer>
  );
}

export default VersionFooter;