import { useState, useEffect } from 'react';

export const useMobileDetection = (breakpoint = 480) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('To Do');

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };
    
    // Verificar inicialmente
    checkIfMobile();
    
    // Adicionar listener para mudanças de tamanho da janela
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup ao desmontar
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [breakpoint]);

  // Helper function para obter classe da coluna com base na visualização mobile
  const getColumnClassName = (columnName) => {
    const baseClass = 'column';
    const specificClass = columnName.toLowerCase().replace(' ', '-');
    const hiddenClass = isMobile && activeTab !== columnName ? 'hidden-mobile' : '';
    return `${baseClass} column-${specificClass} ${hiddenClass}`;
  };

  return {
    isMobile,
    activeTab,
    setActiveTab,
    getColumnClassName
  };
};