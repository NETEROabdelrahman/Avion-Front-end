import Image from 'next/image'

const Footer = () => {
  return (
    <div className='bg-[#2A254B]  text-white py-[58px] px-[82px]'>
      <div className='   flex  flex-row flex-wrap justify-between'>
        <ul className=' gap-2 flex flex-col p-5'>
          <li>Menu</li>
          <li>New Arrivals</li>
          <li>Best Sellers</li>
          <li>Recently viewd</li>
          <li>Popular this week</li>
          <li>All products</li>
        </ul>
        <ul className=' gap-2 flex flex-col p-5'>
          <li>categories</li>
          <li>crockery</li>
          <li>furniture</li>
          <li>homeware</li>
          <li>plant pots</li>
          <li>chairs</li>
        </ul>
        <ul className=' gap-2 flex flex-col p-5'>
          <li>our company</li>
          <li>about us</li>
          <li>vacancies</li>
          <li>contact us</li>
          <li>privacy</li>
          <li>return policy</li>
        </ul>
       

      </div>
      <div className='w-full bg-white h-[0.5px] my-[26px] mx-[26px] '></div>
      <div className='flex flex-row md:justify-between justify-center'>
        <h1>copy right 2022 AVION LTD</h1>
        <ul className='md:flex flex-row gap-2 hidden'>
          
          <Image
            src={require("/public/svg/Logo--facebook.svg")}
            alt=''
            width={0}
            height={0}
            className='w-fit h-fit'
          />
          <Image
            src={require("/public/svg/Logo--instagram.svg")}
            alt=''
            width={0}
            height={0}
            className='w-fit h-fit'

          />
          <Image
            src={require("/public/svg/Logo--linkedin.svg")}
            alt=''
            width={0}
            height={0}
            className='w-fit h-fit'

          />
          <Image
            src={require("/public/svg/Logo--pinterest.svg")}
            alt=''
            width={0}
            height={0}
            className='w-fit h-fit'

          />
          <Image
            src={require("/public/svg/Logo--skype.svg")}
            alt=''
            width={0}
            height={0}
            className='w-fit h-fit'

          />

        </ul>
      </div>
    </div>
  )
};

export default Footer