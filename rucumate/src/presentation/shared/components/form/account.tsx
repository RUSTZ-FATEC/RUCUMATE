function AccountComponent(props: any) {
    return (
        <>
            <span className="title_account">{props.title}</span>
            <a href={props.href} className="title_link_account">{props.title_link}</a>
        </>
    );
}

export default AccountComponent;