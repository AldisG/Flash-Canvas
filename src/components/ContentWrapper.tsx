type Props = {
  children: React.ReactNode;
};

const ContentWrapper = ({children}: Props) => {
    return (
        <div className="min-h-screen items-center flex flex-col bg-slate-500 px-8">
            {children}
        </div>
    )
}
export default ContentWrapper