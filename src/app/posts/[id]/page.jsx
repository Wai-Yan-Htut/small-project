export default async function PostDetailsPage({ params }) {
  const { id } = await params;
  console.log(id);

  return (
    <div>
      <p>Post Id: {id}</p>
    </div>
  );
}
