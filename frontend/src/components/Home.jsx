export default function Home() {

    const userData = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
        <h1>Welcome, {userData ? userData.first_name + ' ' + userData.last_name : 'Guest'}!</h1>
        <p>This is the home page of your application.</p>
    </div>
  );
}