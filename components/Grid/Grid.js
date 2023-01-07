  
  const Grid = ({className,  children}) => (
    <div className={className}>
      <div className='grid grid-cols-auto-fill gap-8'>{children}</div>
    </div>
  );
  
  export default Grid;
  