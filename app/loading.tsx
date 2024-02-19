import Image from "next/image";

const Loading = () => {
  return (
    <div className='w-full flex justify-center align-center items-center'>
      <Image
        src={'/assets/icons/Loader2.svg'}
        alt='loading'
        width={200}
        height={200}
        className='object-contain'
      />
    </div>
  );
};

export default Loading;
