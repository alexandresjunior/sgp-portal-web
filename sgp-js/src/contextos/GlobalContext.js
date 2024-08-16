import React, { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [usuarioLogado, setUsuarioLogado] = useState({});

    useEffect(() => {
        const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || JSON.parse(sessionStorage.getItem("usuarioLogado"));
        if (usuarioLogado) {
            setUsuarioLogado(usuarioLogado);
        }
    }, []);

    const login = (dadosUsuario, manterConectado) => {
        setUsuarioLogado(dadosUsuario);

        if (manterConectado) {
            localStorage.setItem("usuarioLogado", JSON.stringify(dadosUsuario));
        } else {
            sessionStorage.setItem("usuarioLogado", JSON.stringify(dadosUsuario));
        }
    };

    const logout = () => {
        setUsuarioLogado({});
        localStorage.removeItem("usuarioLogado");
        sessionStorage.removeItem("usuarioLogado");
    };

    return (
        <GlobalContext.Provider value={{ usuarioLogado, login, logout }}>
            {children}
        </GlobalContext.Provider>
    );
};
