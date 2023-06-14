interface AccountComponentProps {
    title: string;
    href: string;
    title_link: string;
}

function AccountComponent(props: AccountComponentProps) {
    return (
        <>
            <span className="title_account">{props.title}</span>
            <a href={props.href} className="title_link_account">{props.title_link}</a>
        </>
    );
}

export default AccountComponent;