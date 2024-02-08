import Link from 'next/link'

const Form = ({ type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
        <h1 className='head_text text-left'>
            <span className='blue_gradient'>{type} Post</span>
        </h1>
        <p className='desc text-left max-w-md'>
            {type} and share your thoughts with the world,
            and let your imagination run wild.
        </p>

        <form
            onSubmit={handleSubmit}
            className='flex flex-col mt-10 w-full max-w-2xl gap-7 glassmorphism'
        >
            <label className=''>
                <span className='font-satoshi text-base font-semibold text-gray-700'>
                    Your AI Prompt
                </span>

                <textarea
                    value={post.prompt}
                    onChange={(e) => setPost({...post, prompt: e.target.value})}
                    required
                    placeholder='Write your prompt here...'
                    className='form_textarea'
                />
            </label>
            <label className=''>
                <span className='font-satoshi text-base font-semibold text-gray-700'>
                    Tag 
                    <span className='font-normal'> (#developement, #culture, #idea)</span>
                </span>

                <input
                    value={post.tag}
                    onChange={(e) => setPost({...post, tag: e.target.value})}
                    required
                    placeholder='Tag (You can add only one tag)'
                    className='form_input'
                />
            </label>

            <div className='flex-end mx-3 mb-5 gap-4'>
                <Link href='/' className='text-gray-500 text-sm'>Cancel</Link>

                <button type='submit' disabled={submitting} className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
                    {submitting ? type === "Create" ? 'Creating...' : `${type}ing...` : type}
                </button>
            </div>

        </form>
    </section>
  )
}

export default Form