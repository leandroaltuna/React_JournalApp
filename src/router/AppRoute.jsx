import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes';
import { JournalRoutes } from '../journal/routes';
import { CheckingAuth } from '../ui';
import { useCheckAuth } from '../hooks';


export const AppRoute = () => {
  
    const status = useCheckAuth();

    if ( status === 'checking' )
    {
        return <CheckingAuth />;
    }
    
    return (
        
        <Routes>

            {
                ( status === 'authenticated' )
                ? <Route path="/*" element={ <JournalRoutes /> } />
                : <Route path="/auth/*" element={ <AuthRoutes /> } />
            }

            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
            
            {/* 
            <Route path="/auth/*" element={ <AuthRoutes /> } />
        
            <Route path="/*" element={ <JournalRoutes /> } /> 
            */}

        </Routes>
    )
}
