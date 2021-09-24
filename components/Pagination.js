import React from 'react';
import tw from 'twin.macro';

const Pagination =({tilesPerPage, totalPosts,paginate})=>{
    const pageNumbers=[];

    for (let i=1;i<=Math.ceil(totalPosts/tilesPerPage);i++){
        pageNumbers.push(i);
    }

    return (
        <nav tw="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            {pageNumbers.map(number=>(
                
                    <a onClick ={()=>paginate(number)}  className='page-link' tw='bg-white border-gray-300 text-gray-500 hover:bg-gray-100 relative inline-flex items-center px-4 py-2 border text-sm font-medium'>{number}</a>
               
            ))}
        </nav>
    )
}

export default Pagination;