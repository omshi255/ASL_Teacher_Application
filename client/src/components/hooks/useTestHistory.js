import { useEffect, useState } from "react";
import { fetchTestHistory } from "../../api/testApi";

const useTestHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const data = await fetchTestHistory();
        if (mounted) setHistory(data);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return { history, loading, error };
};

export default useTestHistory;
