    "use client"
    import React, { useState, useEffect, useRef } from 'react';
    import { Search, X } from 'lucide-react';

    const SearchDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const searchInputRef = useRef(null);
    const dialogRef = useRef(null);

    // Function to search the page content
    const searchPageContent = (query) => {
        if (!query.trim()) {
        setSearchResults([]);
        return;
        }

        const lowerCaseQuery = query.toLowerCase();
        
        // Get all text content from the page
        const textNodes = [];
        const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
        );

        let node;
        while ((node = walker.nextNode())) {
        const parentElement = node.parentElement;
        // Skip hidden elements and our own search dialog
        if (
            parentElement &&
            window.getComputedStyle(parentElement).display !== 'none' &&
            !dialogRef.current?.contains(parentElement) &&
            node.textContent.trim()
        ) {
            textNodes.push({
            element: parentElement,
            text: node.textContent.trim(),
            });
        }
        }

        // Find matches
        const results = textNodes
        .filter(({ text }) => text.toLowerCase().includes(lowerCaseQuery))
        .map(({ element, text }) => {
            const index = text.toLowerCase().indexOf(lowerCaseQuery);
            return {
            element,
            text,
            context: getTextContext(text, index, lowerCaseQuery.length),
            };
        })
        .slice(0, 10); // Limit to 10 results

        setSearchResults(results);
    };

    // Helper function to get text context around the match
    const getTextContext = (text, matchIndex, matchLength) => {
        const contextSize = 30;
        let startIndex = Math.max(0, matchIndex - contextSize);
        let endIndex = Math.min(text.length, matchIndex + matchLength + contextSize);
        
        let prefix = startIndex > 0 ? '...' : '';
        let suffix = endIndex < text.length ? '...' : '';
        
        const contextText = text.substring(startIndex, endIndex);
        const highlightedText = contextText.replace(
        new RegExp(searchQuery, 'gi'),
        (match) => `<mark class="bg-yellow-300 text-black">${match}</mark>`
        );
        
        return prefix + highlightedText + suffix;
    };

    // Handle opening and closing the search dialog
    const openSearchDialog = () => {
        setIsOpen(true);
        setTimeout(() => {
        searchInputRef.current?.focus();
        }, 10);
    };

    const closeSearchDialog = () => {
        setIsOpen(false);
        setSearchQuery('');
        setSearchResults([]);
    };

    // Handle keyboard events
    useEffect(() => {
        const handleKeyDown = (e) => {
        // Open on Ctrl+K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearchDialog();
        }
        
        // Close on Escape
        if (e.key === 'Escape' && isOpen) {
            closeSearchDialog();
        }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // Update search results when query changes
    useEffect(() => {
        searchPageContent(searchQuery);
    }, [searchQuery]);

    // Scroll to the element when clicked
    const scrollToElement = (element) => {
        closeSearchDialog();
        element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        });
        
        // Highlight the element temporarily
        const originalBackground = element.style.backgroundColor;
        element.style.backgroundColor = '#fef08a'; // Light yellow highlight
        
        setTimeout(() => {
        element.style.backgroundColor = originalBackground;
        }, 2000);
    };

    return (
        <>
        {/* Keyboard shortcut indicator */}
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded-lg opacity-70 cursor-pointer hover:opacity-100" onClick={openSearchDialog}>
            <div className="flex items-center gap-2">
            <Search size={16} />
            <span>Search</span>
            <div className="flex gap-1">
                <kbd className="px-2 py-1 text-xs bg-gray-700 rounded">Ctrl</kbd>
                <kbd className="px-2 py-1 text-xs bg-gray-700 rounded">K</kbd>
            </div>
            </div>
        </div>

        {/* Search modal */}
        {isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-24" onClick={closeSearchDialog}>
            <div 
                ref={dialogRef}
                className="bg-gray-900 w-full max-w-2xl rounded-lg shadow-xl overflow-hidden" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search input */}
                <div className="flex items-center border-b border-gray-700 p-4">
                <Search size={20} className="text-gray-400 mr-3" />
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search in page..."
                    className="bg-transparent w-full text-white outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={closeSearchDialog} className="ml-2 text-gray-400 hover:text-white">
                    <X size={20} />
                </button>
                </div>

                {/* Search results */}
                <div className="max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                    <ul className="py-2">
                    {searchResults.map((result, index) => (
                        <li 
                        key={index}
                        className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                        onClick={() => scrollToElement(result.element)}
                        >
                        <div 
                            dangerouslySetInnerHTML={{ __html: result.context }} 
                            className="text-gray-300"
                        />
                        </li>
                    ))}
                    </ul>
                ) : searchQuery ? (
                    <div className="p-4 text-gray-400 text-center">
                    No results found for "{searchQuery}"
                    </div>
                ) : (
                    <div className="p-4 text-gray-400 text-center">
                    Type to start searching...
                    </div>
                )}
                </div>
            </div>
            </div>
        )}
        </>
    );
    };

    export default SearchDialog;