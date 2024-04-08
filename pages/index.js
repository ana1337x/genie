import Link from 'next/link';

export default function Home() {
    return (
      <div>
        <h1>Hello, World!</h1>
        <p>genie's coming!</p>
        <Link href="/post"><a>Post an Item</a></Link>
      </div>
    );
  }
