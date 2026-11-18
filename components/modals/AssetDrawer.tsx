'use client';

import React, { useState } from 'react';
import {
  X,
  FolderHeart,
  Download,
  Trash2,
  ExternalLink,
  Edit2,
  Check,
  Search,
  Box,
} from 'lucide-react';
import { SavedAsset } from '@/types';
import { formatNumber } from '@/lib/utils';

interface AssetDrawerProps {
  isOpen: boolean;
  assets: SavedAsset[];
  onClose: () => void;
  onLoadAsset: (asset: SavedAsset) => void;
  onDeleteAsset: (id: string) => void;
  onRenameAsset: (id: string, newName: string) => void;
}

export const AssetDrawer: React.FC<AssetDrawerProps> = ({
  isOpen,
  assets,
  onClose,
  onLoadAsset,
  onDeleteAsset,
  onRenameAsset,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  if (!isOpen) return null;

  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startRename = (asset: SavedAsset) => {
    setEditingId(asset.id);
    setEditName(asset.name);
  };

  const saveRename = (id: string) => {
    if (editName.trim()) {
      onRenameAsset(id, editName.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full bg-studio-900 border-l border-zinc-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
              <FolderHeart className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">My 3D Asset Library</h2>
              <p className="text-[11px] text-zinc-400">{assets.length} saved models</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-zinc-800/60">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search assets by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-studio-950 border border-zinc-800 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Assets List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {filteredAssets.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-zinc-800 rounded-2xl">
              <Box className="h-8 w-8 text-zinc-600 mb-2" />
              <p className="text-xs font-medium text-zinc-400">No assets found</p>
              <p className="text-[11px] text-zinc-500 mt-1">
                Generate a 3D model in the studio and click &quot;Save to Asset Library&quot;.
              </p>
            </div>
          ) : (
            filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="rounded-2xl border border-zinc-800/80 bg-studio-950/60 p-3.5 hover:border-zinc-700 transition-all group"
              >
                <div className="flex gap-3">
                  {/* Thumbnail */}
                  <div className="h-16 w-16 flex-shrink-0 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 p-1 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset.thumbnailUrl || asset.sourceImageUrl}
                      alt={asset.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Metadata */}
                  <div className="flex-1 min-w-0">
                    {editingId === asset.id ? (
                      <div className="flex items-center gap-1.5 mb-1">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-0.5 text-xs text-white"
                          autoFocus
                        />
                        <button
                          onClick={() => saveRename(asset.id)}
                          className="p-1 rounded bg-indigo-600 text-white"
                        >
                          <Check className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold text-white truncate group-hover:text-indigo-300">
                          {asset.name}
                        </h4>
                        <button
                          onClick={() => startRename(asset)}
                          className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-white p-1"
                          title="Rename"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-1 text-[10px] text-zinc-400 font-mono">
                      <span>{formatNumber(asset.triangles)} tris</span>
                      <span>•</span>
                      <span className="uppercase text-indigo-400 font-semibold">
                        {asset.preset}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/60 text-[10px] text-zinc-400">
                      <span>{asset.createdAt}</span>
                      <span className="uppercase font-mono bg-zinc-800/80 px-1.5 py-0.5 rounded text-zinc-300">
                        .{asset.format}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/50">
                  <button
                    onClick={() => {
                      onLoadAsset(asset);
                      onClose();
                    }}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white py-1.5 text-xs font-medium transition-all"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Load in Studio</span>
                  </button>

                  <button
                    onClick={() => onDeleteAsset(asset.id)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-800 hover:border-rose-500/30 bg-zinc-900/60 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-400 py-1.5 text-xs font-medium transition-all"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
