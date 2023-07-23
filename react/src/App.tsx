import "./App.css";

function App() {
    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign in your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">Or <a href="#" className=""></a></p>
                </div>
            </div>
        </div>
    );
}

export default App;
