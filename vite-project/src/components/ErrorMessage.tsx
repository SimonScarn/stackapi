import { Button } from "@mui/material";

interface ErrorMessageProps {
  fetchApi: () => void; 
}

function ErrorMessage({ fetchApi }: ErrorMessageProps) {
  return (
    <div className="error">
      <div className="center">
        Please try fetching again
        <br />
        <Button variant="contained" onClick={fetchApi}>
          Retry
        </Button>
      </div>
    </div>
  );
}

export default ErrorMessage;
