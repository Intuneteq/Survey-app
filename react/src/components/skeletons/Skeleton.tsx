
type PropsType = { classes: string}

const Skeleton = ({ classes }: PropsType) => {
   const classNames = `skeleton ${classes} animate-pulse`
  return (
    <div className={classNames}></div>
  )
}

export default Skeleton