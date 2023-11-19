export const searchTermDefination = (searchTerm: string) => {
    const filter = {
        $or: [
            {
                name: { $regex: searchTerm as string, $options: 'i' }
            },
        ]
    };
    
    return filter;
}