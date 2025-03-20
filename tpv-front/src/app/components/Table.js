export const Table = ({ className, onClick, children }) => {
    return (
      <div onClick={onClick} className={`${className} cursor-pointer text-white py-2 px-4 rounded-lg h-fit`}>
        {children}
      </div>
    )
  }