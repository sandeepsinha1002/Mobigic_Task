
import { AuthProvider } from './components/AuthContext';
import FileUploadApp from './components/FileUpload';

function App() {
  return (
    <AuthProvider> <div className="App">
      <FileUploadApp />
    </div></AuthProvider>

  );
}

export default App;
