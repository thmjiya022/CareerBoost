import React, { useCallback, useState } from "react";
import { Upload, File, X } from "lucide-react";

interface FileUploadProps {
	onFileSelect: (file: File | null) => void;
	accept?: string;
	maxSize?: number; // in MB
	disabled?: boolean;
	selectedFile?: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({
	onFileSelect,
	accept = ".pdf,.doc,.docx",
	maxSize = 10,
	disabled = false,
	selectedFile,
}) => {
	const [dragOver, setDragOver] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const validateFile = useCallback(
		(file: File): boolean => {
			setError(null);

			// Check file size
			if (file.size > maxSize * 1024 * 1024) {
				setError(`File size must be less than ${maxSize}MB`);
				return false;
			}

			// Check file type
			const allowedTypes = accept
				.split(",")
				.map((type) => type.trim().toLowerCase());
			const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

			if (!allowedTypes.includes(fileExtension)) {
				setError(`File type not supported. Allowed: ${accept}`);
				return false;
			}

			return true;
		},
		[accept, maxSize]
	);

	const handleDrop = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			setDragOver(false);

			if (disabled) return;

			const files = Array.from(e.dataTransfer.files);
			const file = files[0];

			if (file && validateFile(file)) {
				onFileSelect(file);
			}
		},
		[disabled, onFileSelect, validateFile]
	);

	const handleFileInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];

			if (file && validateFile(file)) {
				onFileSelect(file);
			}

			// Reset input
			e.target.value = "";
		},
		[onFileSelect, validateFile]
	);

	const handleDragOver = useCallback(
		(e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
			if (!disabled) {
				setDragOver(true);
			}
		},
		[disabled]
	);

	const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragOver(false);
	}, []);

	const removeFile = useCallback(() => {
		onFileSelect(null);
		setError(null);
	}, [onFileSelect]);

	const formatFileSize = (bytes: number): string => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	return (
		<div className="w-full">
			{!selectedFile ? (
				<div
					className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${
							dragOver
								? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
								: "border-gray-300 dark:border-gray-600"
						}
            ${
							disabled
								? "opacity-50 cursor-not-allowed"
								: "cursor-pointer hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
						}
          `}
					onDrop={handleDrop}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onClick={() =>
						!disabled && document.getElementById("file-input")?.click()
					}
				>
					<input
						id="file-input"
						type="file"
						accept={accept}
						onChange={handleFileInput}
						disabled={disabled}
						className="hidden"
					/>

					<Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />

					<div className="text-lg font-medium text-gray-900 dark:text-white mb-2">
						Drag & drop your CV here
					</div>

					<div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
						or
					</div>

					<button
						type="button"
						disabled={disabled}
						className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
					>
						Browse Files
					</button>

					<div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
						{accept.toUpperCase()} files accepted. Max {maxSize}MB
					</div>
				</div>
			) : (
				<div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<File className="h-8 w-8 text-blue-600" />
							<div>
								<div className="font-medium text-gray-900 dark:text-white">
									{selectedFile.name}
								</div>
								<div className="text-sm text-gray-500 dark:text-gray-400">
									{formatFileSize(selectedFile.size)}
								</div>
							</div>
						</div>

						<button
							onClick={removeFile}
							disabled={disabled}
							className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
						>
							<X className="h-5 w-5 text-gray-400" />
						</button>
					</div>
				</div>
			)}

			{error && (
				<div className="mt-2 text-sm text-red-600 dark:text-red-400">
					{error}
				</div>
			)}
		</div>
	);
};

export default FileUpload;
