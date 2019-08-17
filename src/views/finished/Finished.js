import React from 'react'

export default props => {

    return (
        <div className="Finished">
            
            <h1>WELL PLAYED {props.test}, {props.confirmation}</h1>

            <button 
                onClick={() => props.onClick(
                    {
                        type: 'newRoom', 
                        data: {
                            content: {
                                number: '789456',
                                status: 'opened'
                            }
                        }
                    }
                )}>
                INSERT
            </button>

            <button 
                onClick={() => props.onClick(
                    {
                        type: 'startRoom', 
                        data: {
                            id: '5d4eab30ec98fc2f8296b948', 
                            content: {
                                status: 'started'
                            }
                        }
                    }
                )}>
                UPDATE
            </button>

        </div>
    )
}