import PushManager from '../PushManager';
import PushClientHandler from './PushClientHandler';

export default function Home() {
  return (
    <div className='max-w-5xl mx-auto px-3 py-16 flex flex-col justify-center gap-3'>
      <h1 className='text-center'>Web Push Demo</h1>
      <div className='flex justify-center'>
        <PushManager />
        <PushClientHandler />
      </div>
    </div>
  );
}
