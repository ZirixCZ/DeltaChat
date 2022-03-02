import Template from '../components/Template/Template'

export default function Home() {
  return (
    <>
      {/* You can use the component more times */}
      <Template text="Sup" />
      <Template text="How are you" ><p>I am a children</p></Template>
    </>
  )
}
