import { useMemo } from 'react';
import { IProfileGridProps } from '../../types';
import { getRandomColor } from '../../utils/helpers';
import './ProfileGrid.css';
// TODO:Add post to profile after mutation
export const ProfileGrid = (props: IProfileGridProps) => {
    const { columns } = props;
    const allColumns = useMemo(() => {
        return columns.map((column) => {
            return column.sort((a, b) => {
                return (
                    new Date(b?.createdAt).getTime() -
                    new Date(a?.createdAt).getTime()
                );
            });
        });
    }, [columns]);

    return (
        <div className="flex flex-wrap m-3">
            {allColumns.map((column, i) => {
                return (
                    <div
                        className="px-2"
                        style={{
                            flex: `${100 / allColumns.length}%`,
                        }}
                        key={i}
                    >
                        {column.map((post) => {
                            const isPostLoaded = post.url?.startsWith('blob');
                            return (
                                <div
                                    className={`bg-${getRandomColor()}-500 rounded-md`}
                                    key={post.id}
                                >
                                    <img
                                        src={post?.url || ''}
                                        alt={`post-${post.id}`}
                                        className={`w-full h-full object-contain  rounded-md cursor-pointer transition duration-500 ease-linear transform hover:-translate-y-2 hover:translate-x-2 images ${
                                            isPostLoaded ? '' : 'hidden'
                                        }`}
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};
