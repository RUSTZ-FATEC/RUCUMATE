interface TitleComponentProps {
    title: string;
}

function TitleComponent(props: TitleComponentProps) {
    return (
        <>
            <h1 className='title'>{props.title}</h1>
        </>
    );
}

export default TitleComponent;