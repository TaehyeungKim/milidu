import {useState, useEffect} from 'react'
import {createPortal} from 'react-dom'

interface ComponentPortalProps {
    component: JSX.Element
  }
  
  export function ComponentPortal({component}:ComponentPortalProps) {
      const [isCSR, setIsCSR] = useState<boolean>(false);
    
      useEffect(() => {
        setIsCSR(true);
      }, [])
      
      if (typeof window === 'undefined') return <></>;
      if (!isCSR) return <></>;
    
      
      const portal = createPortal(component, document.getElementById('portal') as HTMLDivElement);
    
      return portal
  }