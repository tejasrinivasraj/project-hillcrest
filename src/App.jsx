import { HashRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@layouts/MainLayout'
import { HomePage } from '@pages/HomePage'
import { AboutPage } from '@pages/AboutPage'
import { ProductsPage } from '@pages/ProductsPage'
import { TeamPage } from '@pages/TeamPage'
import { ContactPage } from '@pages/ContactPage'
import { NotFoundPage } from '@pages/NotFoundPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
