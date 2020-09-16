import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({}) {
  useEffect(() => {
    /**
     * const unlisten = x.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
     */
  }, []);

  return null;
}

export default withRouter(ScrollToTop);
