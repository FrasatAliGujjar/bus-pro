import React from 'react'

const grid = () => {
    return (
        <>
            {/* ================================================= */}

            <div className="container border-2 border-red-500 h-fit p-5 card mt-2 flex justify-around items-center ">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* ------------------------- */}
                    <div className="border-2 border-blue-500">
                        {/* box 1 */}

                    </div>
                    {/* ------------------------- */}
                    <div className="border-2 border-blue-500">
                        {/* box 2 */}

                    </div>
                    {/* ------------------------- */}
                    <div className="border-2 border-blue-500">
                        {/* box 3 */}

                    </div>
                    {/* ------------------------- */}
                </div>
            </div>

            {/* ================================================= */}
        </>
    )
}

export default grid
