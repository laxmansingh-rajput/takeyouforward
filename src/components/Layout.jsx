import React from 'react'
import { calendarThemes } from '../data/themes'
const Layout = ({ children, month }) => {
    return (
        <div className='h-screen w-screen flex items-center justify-center'
            style={{
                background: calendarThemes[month].colors.wall,
            }}>
            {children}
        </div>
    )
}

export default Layout
