export interface User {
    id: string;
    email: string;
    fullName?: string;
    imageUrl?: string;
    name?: string;
    image?: string;
}

export interface Message {
    id: string;
    role: any;
    content: string;
    timestamp: string;
}

export interface Version {
    id: string;
    timestamp: string;
    code: string;
}

export interface Project {
    id: string;
    name: string;
    initial_prompt: string;
    current_code: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    user?: User;
    isPublished?: boolean;
    versionId?: string;
    conversation: Message[];
    versions: Version[];
    current_version_index: string;
}

export interface plan {
    id: string;
    name: string;
    price: string;
    credits: number;
    description: string;
    features: string[];
}

export interface SidebarProps {
    isMenuOpen: boolean;
    project: Project | null;
    setProject: (project: Project) => void;
    isGenerating: boolean;
    setIsGenerating: (isGenerating: boolean) => void;
}

export interface ProjectPreviewProps {
    project: Project | null;
    isGenerating: boolean;
    device?: 'phone' | 'tablet' | 'desktop';
    showEditorPanel?: boolean;
}

export interface ProjectPreviewRef {
    getCode: () => string | undefined;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

export interface EditorPanelProps {
    selectedElement: {
        tagName: string;
        className: string;
        text: string;
        styles: {
            padding: string;
            margin: string;
            backgroundColor: string;
            color: string;
            fontSize: string;
        }
    } | null;
    onUpdate: (updates: any) => void;
    onClose: () => void;
}

export interface FormState {
  name: string;
  email: string;
  message: string;
}