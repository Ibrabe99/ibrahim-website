import React from 'react'

export default function SectionHeader({title, description}) {
  return (
    <div className='section-header'>
        <h2>{title}</h2>
        <p>{description}</p>
    </div>
  )
}
