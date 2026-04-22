'use client';

import { useState, useCallback } from 'react';
import { Brand, Agency, User, Plan, Subscription } from '@/lib/types';

export interface UseDataManagementProps<T> {
  initialData: T[];
  onAdd?: (item: T) => void;
  onUpdate?: (id: string, item: T) => void;
  onDelete?: (id: string) => void;
}

export function useDataManagement<T extends { id: string }>({
  initialData,
  onAdd,
  onUpdate,
  onDelete,
}: UseDataManagementProps<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const add = useCallback(
    (item: Omit<T, 'id'>) => {
      setIsLoading(true);
      setTimeout(() => {
        const newItem = {
          ...item,
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        } as T;
        setData((prev) => [newItem, ...prev]);
        onAdd?.(newItem);
        setIsLoading(false);
        console.log('[v0] Added item:', newItem);
      }, 300);
    },
    [onAdd]
  );

  const update = useCallback(
    (id: string, updates: Partial<T>) => {
      setIsLoading(true);
      setTimeout(() => {
        setData((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          )
        );
        const updatedItem = data.find((item) => item.id === id);
        if (updatedItem) {
          onUpdate?.(id, { ...updatedItem, ...updates } as T);
          console.log('[v0] Updated item:', id);
        }
        setIsLoading(false);
      }, 300);
    },
    [data, onUpdate]
  );

  const remove = useCallback(
    (id: string) => {
      setIsLoading(true);
      setTimeout(() => {
        setData((prev) => prev.filter((item) => item.id !== id));
        onDelete?.(id);
        setIsLoading(false);
        console.log('[v0] Deleted item:', id);
      }, 300);
    },
    [onDelete]
  );

  return {
    data,
    isLoading,
    add,
    update,
    remove,
    setData,
  };
}

export function useBrands(initialBrands: Brand[]) {
  return useDataManagement<Brand>({
    initialData: initialBrands,
  });
}

export function useAgencies(initialAgencies: Agency[]) {
  return useDataManagement<Agency>({
    initialData: initialAgencies,
  });
}

export function useUsers(initialUsers: User[]) {
  return useDataManagement<User>({
    initialData: initialUsers,
  });
}

export function usePlans(initialPlans: Plan[]) {
  return useDataManagement<Plan>({
    initialData: initialPlans,
  });
}

export function useSubscriptions(initialSubscriptions: Subscription[]) {
  return useDataManagement<Subscription>({
    initialData: initialSubscriptions,
  });
}
