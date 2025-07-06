import React from 'react'

const CustomerReviews = () => {
  return (
    <section className='py-16 px-8 bg-white text-center'>
      <h2 className='text-3xl font-semibold mb-6'>What Our Customers Say</h2>
      <p className='text-gray-600 mb-10 max-w-2xl mx-auto'>
        Real feedback from people who’ve embraced our exclusive drops and
        one-of-a-kind pieces.
      </p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* You can later map this dynamically */}
        <div className='border rounded-xl p-6 shadow-sm'>
          <p className='italic text-gray-700'>
            “I felt like I owned the runway. Truly luxurious and unique.”
          </p>
          <p className='mt-4 font-semibold'>– Rhea M.</p>
        </div>
        <div className='border rounded-xl p-6 shadow-sm'>
          <p className='italic text-gray-700'>
            “The fit, the fabric, the packaging — everything screamed premium.”
          </p>
          <p className='mt-4 font-semibold'>– Ayesha K.</p>
        </div>
        <div className='border rounded-xl p-6 shadow-sm'>
          <p className='italic text-gray-700'>
            “Loved the idea of limited drops. Makes each piece feel extra
            special.”
          </p>
          <p className='mt-4 font-semibold'>– Zoya A.</p>
        </div>
      </div>
    </section>
  )
}

export default CustomerReviews
