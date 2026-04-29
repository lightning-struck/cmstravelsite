import s from './container.module.css'
import cn from 'classnames'
export const Container = ({children, className}) => {
    return <div className={cn(s.container, className)}>{children}</div>
}