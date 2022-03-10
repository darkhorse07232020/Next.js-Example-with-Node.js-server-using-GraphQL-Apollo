import React, { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

import * as styles from './Editor.css'

// TODO: Complete query below
export const THE_MATRIX = gql`
  query dataSet {
    matrix {
      id
      row
    }
  }
`

export const UPDATE_MATRIX = gql`
  mutation update($matrix: [[Int!]!]!) {
    updateMatrix(matrix: $matrix)
  }
`

const Editor = () => {
    const [matrix, setMatrix] = useState([])
    const [buttonTitle, setButtonTitle] = useState('Update Data');

    const queryData = useQuery(THE_MATRIX)
    const [updateMatrix, updatedData] = useMutation(UPDATE_MATRIX, {
      onCompleted() {
        setButtonTitle('Updated!')
      },
      onError(error) {
        setButtonTitle('Error!')
      }
    });

    useEffect(() => {
      if (!queryData.loading && queryData.data) {
        setMatrix(queryData.data.matrix.map((row) => (
          row.row.map((cell) => cell)
        )))
      }
    }, [queryData.loading])

    useEffect(() => {
      if (updatedData.updating) {
        setButtonTitle('Updating...')
      }
    }, [updatedData.updating])

    // TODO: Render data below according to provided screenshot
    if (queryData.loading)
      return <div>Loading...</div>

    if (queryData.error)
      return <div>Error Occured</div>

    const changeMatrix = (r, c, value) => {
      setMatrix(prev => {
        prev[r][c] = parseInt(value)
        return [...prev]
      })
      setButtonTitle('Update Data')
    }

    const updateData = () => {
      updateMatrix({ variables: { matrix: matrix } })
    }

    return (
      <div className={styles.wrapper}>
        {matrix.length > 0 ? (
          <>
            <div className={styles.rowContainer}>
              <div className={styles.colHeader}></div>
              {matrix[0].map((_, index) => (
                <div className={`${styles.cell} ${styles.headerCell}`} key={`header-${index}`}>
                  {index + 1}
                </div>
              ))}
            </div>
            {matrix.map((row, rIndex) => (
              <div className={styles.rowContainer} key={`row-${rIndex}`}>
                <div className={styles.colHeader}>{rIndex + 1}</div>
                {row.map((cell, cIndex) => (
                  <input
                    className={styles.cell}
                    key={`cell-${rIndex}-${cIndex}`}
                    defaultValue={cell}
                    onChange={(e) => changeMatrix(rIndex, cIndex, e.target.value)}
                  ></input>
                ))}
              </div>
            ))}
            <button className={styles.button} onClick={updateData} disabled={updatedData.updating}>
              {buttonTitle}
            </button>
          </>
        ) : (
          'Empty Data'
        )}
      </div>
    )
}

export default Editor
