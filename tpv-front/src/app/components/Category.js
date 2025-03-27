export const Category = ({ cat, className, onClick, children }) => (
  <div onClick={onClick} className={`${className} cursor-pointer text-white py-2 px-4 rounded-lg h-fit`}>
    {children}
  </div>
)
