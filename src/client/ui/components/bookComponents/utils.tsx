export const adjustAreaHeight = (ref: React.RefObject<HTMLTextAreaElement>) => {
    if (ref.current) {
        ref.current.style.height = 'auto';
        ref.current.style.height = ref.current.scrollHeight + "px";
    }
};

export const adjustAreaHeightGrid = (
    ref1: React.RefObject<HTMLTextAreaElement>,
    ref2: React.RefObject<HTMLTextAreaElement>
    ) => {
    if (ref1.current && ref2.current) {
        ref1.current.style.height = 'auto';
        ref2.current.style.height = 'auto';
        const height = Math.max(ref1.current.scrollHeight, ref2.current.scrollHeight)
        ref1.current.style.height = height + "px";
        ref2.current.style.height = height + "px";
    }
};

export const validateContent = (input: string, regex:RegExp, setValidatorState: any) => {
        if(regex.test(input)) { setValidatorState(true)}
        else{setValidatorState(false)}
}

export const infoMessage ={
    title: "This is the title of the novel. ",
    description: "A short description of the novel. ",
    chapters: "The chapters of this Book. ",
    planet: "The Cosmere Planet where the novel unfolds. ",
    system: "The Planetary System of the Cosmere where the novel unfolds. ",
    shard: "The Shard that rules over the Planet. ",
    startDate: "The year the book was published."
}
export const errorMessage = {
    title: "Title can't be empty!",
    description: "Description can't be empty!",
    chapters: "It makes no sense for a book to have no chapters, you know?",
    planet: "Planet can't be empty! Max 100 characters!",
    system: "System can't be empty! Max 100 characters!",
    shard: "Shard can't be empty! Max 100 characters!",
    startDate: "Year can't be empty! Between -1000 and 1000!"
}