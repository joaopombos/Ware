import React from 'react';
import AppCard from '../Componentes/appcard';
import Footer from '../Componentes/footer';

export default function EditComponentPage() {
    const cardStyle = {
        width: '131px',
        height: '198px',
        display: 'inline-block', 
        margin: '10px',  
        textAlign: 'center',  
        boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)',
        border: 'none'
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',  
        paddingTop: '200px',  
        marginBottom: '100px'  
    };

    const rowStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: '50px'  
    };

    return ( 
        <div>
            <div style={containerStyle}>
                <div style={rowStyle}>
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="card" style={cardStyle}>
                            <img src="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="..." />
                            <div className="card-body" style={{ padding: '10px' }}>
                                <h5 className="card-title mb-2">Nome Software</h5>
                                <p className="licenças mb-2">licenças</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={rowStyle}>
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="card" style={cardStyle}>
                            <img src="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="..." />
                            <div className="card-body" style={{ padding: '10px' }}>
                                <h5 className="card-title mb-2">Nome Software</h5>
                                <p className="licenças mb-2">licenças</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer /> 
        </div>
    );
}