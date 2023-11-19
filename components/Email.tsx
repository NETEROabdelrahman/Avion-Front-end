


const Email = () => {
  return (
      <div className=' bg-[#F9F9F9]'>
          <div className="  flex flex-col justify-center items-center p-16 bg-white">
              <h1 className='text-[36px]'>Join the club and get the benefits</h1>
              <p className='text-[16px]'>Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop up stores and more</p>
              <form className='flex flex-row mt-16'>
                  <input type="text" placeholder='your@email.com' className='bg-[#F9F9F9] py-[16px] px-[10px]' />
                  <button className='px-[32px] py-[16px] bg-[#2A254B] text-white'>sign up</button>
              </form>
          </div>
    </div>
  )
}

export default Email