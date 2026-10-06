import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Catalogo from './pages/Catalogo';
import ApiConsumo from './pages/ApiConsumo';
import ArbolRender from './pages/ArbolRender';
import Bitacora from './pages/Bitacora';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="perfil/:slug" element={<Perfil />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="api" element={<ApiConsumo />} />
          <Route path="arbol" element={<ArbolRender />} />
          <Route path="bitacora" element={<Bitacora />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
