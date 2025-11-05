import { ReactNode } from 'react'
import { motion } from 'framer-motion'

// Definir tipos correctos
interface ColumnItem {
  text: string
  url: string
  urlExternal?: string
}

interface Column {
  title: string
  titleUrl: string
  rows: ColumnItem[]
}

interface ImageColumn {
  title: string
  url: string
  imageUrl: string
}

interface ShopMenuProps {
  columns: Column[]
  imageColumns?: ImageColumn[]
}

export const ShopMenu = ({ columns, imageColumns }: ShopMenuProps) => {
  const ColumnTitle = ({ title, titleUrl }: { title: string; titleUrl: string }) => {
    return (
      <motion.button
        type="button"
        className="text-light text-2xl underline"
        whileHover={{
          x: 5,
        }}
      >
        {title}
      </motion.button>
    )
  }

  const ColumnButton = ({ text, url, urlExternal }: ColumnItem) => {
    if (urlExternal) {
      return (
        <motion.a
          href={urlExternal}
          target="_blank"
          rel="noopener noreferrer"
          className="text-light text-md block"
          whileHover={{
            x: 5,
          }}
        >
          {text}
        </motion.a>
      )
    }

    return (
      <motion.button
        className="text-light text-md"
        whileHover={{
          x: 5,
        }}
      >
        {text}
      </motion.button>
    )
  }

  const Column = ({ title, titleUrl, rows }: Column) => {
    return (
      <div className="flex-col flex items-start space-y-4">
        <ColumnTitle title={title} titleUrl={titleUrl} />
        <div className="flex-col flex items-start space-y-3">
          {rows.map((row) => (
            <ColumnButton
              key={row.text}
              text={row.text}
              url={row.url}
              urlExternal={row.urlExternal}
            />
          ))}
        </div>
      </div>
    )
  }

  const ImageColumn = ({ title, url, imageUrl }: ImageColumn) => {
    return (
      <div className="flex-col flex items-center justify-center space-y-4 relative group">
        <img src={imageUrl} alt={title} className="w-auto h-[15vh] rounded-lg" />
        <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
          <p className="text-light text-xs 2xl:text-md bg-primary px-4 rounded-md group-hover:px-2 group-hover:bg-light group-hover:text-primary transition-all">
            {title}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-20 py-4 bg-primary h-auto max-h-[25vh] border-y-1 border-light flex items-start justify-between">
      <section className="flex justify-start space-x-8 w-full">
        {columns.map((column) => (
          <Column
            key={column.title}
            title={column.title}
            titleUrl={column.titleUrl}
            rows={column.rows}
          />
        ))}
      </section>
      <section className="flex justify-end space-x-2 w-full">
        {imageColumns?.map((item) => (
          <ImageColumn
            key={item.title}
            title={item.title}
            url={item.url}
            imageUrl={item.imageUrl}
          />
        ))}
      </section>
    </div>
  )
}
