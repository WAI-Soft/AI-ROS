import { useState } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ProjectFilters {
    category?: string;
    year?: number;
    tags?: string[];
    search?: string;
}

interface Category {
    id: string;
    name: string;
    count: number;
}

interface ProjectFilterBarProps {
    categories: Category[];
    years: number[];
    tags: Array<{ id: string; name: string }>;
    onFilterChange: (filters: ProjectFilters) => void;
    onSearchChange: (query: string) => void;
    currentFilters: ProjectFilters;
}

const ProjectFilterBar = ({
    categories,
    years,
    tags,
    onFilterChange,
    onSearchChange,
    currentFilters,
}: ProjectFilterBarProps) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(currentFilters.search || '');
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

    const handleCategoryClick = (categoryId: string) => {
        const newCategory = currentFilters.category === categoryId ? undefined : categoryId;
        onFilterChange({ ...currentFilters, category: newCategory });
    };

    const handleYearSelect = (year: number) => {
        const newYear = currentFilters.year === year ? undefined : year;
        onFilterChange({ ...currentFilters, year: newYear });
        setIsYearDropdownOpen(false);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearchChange(searchQuery);
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        onFilterChange({});
        onSearchChange('');
    };

    const activeFiltersCount =
        (currentFilters.category ? 1 : 0) +
        (currentFilters.year ? 1 : 0) +
        (currentFilters.tags?.length || 0) +
        (currentFilters.search ? 1 : 0);

    return (
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {/* Desktop Filter Bar */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Search */}
                    <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                            />
                        </div>
                    </form>

                    {/* Category Pills */}
                    <div className="flex items-center gap-2 flex-1">
                        <button
                            onClick={() => handleCategoryClick('')}
                            className={cn(
                                'px-4 py-2 rounded-lg font-medium text-sm transition-all',
                                !currentFilters.category
                                    ? 'bg-secondary text-white shadow-lg shadow-secondary/30'
                                    : 'bg-muted text-foreground hover:bg-muted/80'
                            )}
                        >
                            All
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className={cn(
                                    'px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2',
                                    currentFilters.category === category.id
                                        ? 'bg-secondary text-white shadow-lg shadow-secondary/30'
                                        : 'bg-muted text-foreground hover:bg-muted/80'
                                )}
                            >
                                {category.name}
                                <span
                                    className={cn(
                                        'px-2 py-0.5 rounded-full text-xs font-bold',
                                        currentFilters.category === category.id
                                            ? 'bg-white/20 text-white'
                                            : 'bg-secondary/10 text-secondary'
                                    )}
                                >
                                    {category.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Year Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                            className={cn(
                                'px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2',
                                currentFilters.year
                                    ? 'bg-secondary text-white shadow-lg shadow-secondary/30'
                                    : 'bg-muted text-foreground hover:bg-muted/80'
                            )}
                        >
                            {currentFilters.year || 'Year'}
                            <ChevronDown
                                className={cn(
                                    'w-4 h-4 transition-transform',
                                    isYearDropdownOpen && 'rotate-180'
                                )}
                            />
                        </button>

                        {isYearDropdownOpen && (
                            <div className="absolute top-full mt-2 right-0 w-40 bg-card border border-border rounded-lg shadow-xl py-2 animate-fade-in-down">
                                {years.map((year) => (
                                    <button
                                        key={year}
                                        onClick={() => handleYearSelect(year)}
                                        className={cn(
                                            'w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors',
                                            currentFilters.year === year && 'bg-secondary/10 text-secondary font-semibold'
                                        )}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Clear Filters */}
                    {activeFiltersCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClearFilters}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Clear ({activeFiltersCount})
                        </Button>
                    )}
                </div>

                {/* Mobile Filter Bar */}
                <div className="md:hidden space-y-3">
                    {/* Search */}
                    <form onSubmit={handleSearchSubmit}>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-border focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                            />
                        </div>
                    </form>

                    {/* Filter Toggle Button */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="flex-1"
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Filters
                            {activeFiltersCount > 0 && (
                                <span className="ml-2 px-2 py-0.5 rounded-full bg-secondary text-white text-xs font-bold">
                                    {activeFiltersCount}
                                </span>
                            )}
                        </Button>

                        {activeFiltersCount > 0 && (
                            <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                                <X className="w-4 h-4" />
                            </Button>
                        )}
                    </div>

                    {/* Mobile Filter Drawer */}
                    {isFilterOpen && (
                        <div className="p-4 rounded-lg bg-muted border border-border space-y-4 animate-fade-in">
                            {/* Categories */}
                            <div>
                                <label className="text-sm font-semibold text-foreground mb-2 block">
                                    Category
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleCategoryClick('')}
                                        className={cn(
                                            'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                                            !currentFilters.category
                                                ? 'bg-secondary text-white'
                                                : 'bg-card text-foreground hover:bg-card/80'
                                        )}
                                    >
                                        All
                                    </button>
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleCategoryClick(category.id)}
                                            className={cn(
                                                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                                                currentFilters.category === category.id
                                                    ? 'bg-secondary text-white'
                                                    : 'bg-card text-foreground hover:bg-card/80'
                                            )}
                                        >
                                            {category.name} ({category.count})
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Years */}
                            <div>
                                <label className="text-sm font-semibold text-foreground mb-2 block">Year</label>
                                <div className="flex flex-wrap gap-2">
                                    {years.map((year) => (
                                        <button
                                            key={year}
                                            onClick={() => handleYearSelect(year)}
                                            className={cn(
                                                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                                                currentFilters.year === year
                                                    ? 'bg-secondary text-white'
                                                    : 'bg-card text-foreground hover:bg-card/80'
                                            )}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectFilterBar;
