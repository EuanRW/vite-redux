import React from 'react'

interface GovUkTableProps {
  caption: string
  headers: string[]
  rows: { [key: string]: string }[]
}

const GovukTable: React.FC<GovUkTableProps> = ({ caption, headers, rows }) => {
  return (
    <table className="govuk-table">
      <caption className="govuk-table__caption govuk-table__caption--m">{caption}</caption>
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          {headers.map((header, index) => (
            <th key={index} scope="col" className="govuk-table__header">
              {header.charAt(0).toUpperCase() + header.slice(1)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="govuk-table__row">
            {headers.map((header, cellIndex) => (
              <td key={cellIndex} className="govuk-table__cell">
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default GovukTable
