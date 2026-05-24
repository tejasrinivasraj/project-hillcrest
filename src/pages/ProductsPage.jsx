import { useFetch } from '@hooks/useFetch'
import { getProducts } from '@services/productService'
import { Card } from '@components/Card'
import { ProductIcon } from '@components/ProductIcon'
import styles from './ProductsPage.module.css'

export function ProductsPage() {
  const { data: products, loading, error } = useFetch(getProducts)

  if (loading) {
    return (
      <div role="status" aria-label="Loading products" className={styles.loading}>
        <span className="spinner" />
        <p>Loading solutions...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div role="alert" className={styles.error}>
        <p>Something went wrong: {error}</p>
      </div>
    )
  }

  return (
    <section className={styles.products} aria-labelledby="products-heading">
      <h1 id="products-heading">Our Solutions</h1>
      <p className={styles.subtitle}>
        AI-powered tools designed to vibe with your everyday life.
      </p>
      <div className={styles.grid}>
        {products?.map((product) => (
          <Card key={product.id} title={product.name}>
            <ProductIcon name={product.icon} size={36} />
            <p>{product.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
